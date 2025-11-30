import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { positionsService, Position } from '../services/positionsService';
import { useAuth } from '../context/AuthContext';
import PositionForm from './PositionForm';
import '../styles/Positions.css';

const Positions: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const data = await positionsService.getAll();
      setPositions(data);
      setError('');
    } catch (err: any) {
      // If authentication fails, redirect to login
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      setError(err.response?.data?.message || 'Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      try {
        await positionsService.delete(id);
        await fetchPositions();
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete position');
      }
    }
  };

  const handleEdit = (position: Position) => {
    setEditingPosition(position);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPosition(null);
    fetchPositions();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="positions-container">
      <div className="positions-header">
        <h1>Positions Management</h1>
        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingPosition(null);
              setShowForm(true);
            }}
          >
            Add New Position
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PositionForm
              position={editingPosition}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingPosition(null);
              }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading positions...</div>
      ) : (
        <div className="positions-table-container">
          <table className="positions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Position Code</th>
                <th>Position Name</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="no-data">
                    No positions found. Click "Add New Position" to create one.
                  </td>
                </tr>
              ) : (
                positions.map((position) => (
                  <tr key={position.position_id}>
                    <td>{position.position_id}</td>
                    <td>{position.position_code}</td>
                    <td>{position.position_name}</td>
                    <td>
                      {position.created_at
                        ? new Date(position.created_at).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="actions">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(position)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(position.position_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Positions;
