import React, { useState, useEffect } from 'react';
import { positionsService, Position } from '../services/positionsService';
import '../styles/PositionForm.css';

interface PositionFormProps {
  position: Position | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const PositionForm: React.FC<PositionFormProps> = ({ position, onSuccess, onCancel }) => {
  const [positionCode, setPositionCode] = useState('');
  const [positionName, setPositionName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (position) {
      setPositionCode(position.position_code);
      setPositionName(position.position_name);
    }
  }, [position]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (position) {
        // Update existing position
        await positionsService.update(position.position_id, {
          position_code: positionCode,
          position_name: positionName,
        });
      } else {
        // Create new position
        await positionsService.create({
          position_code: positionCode,
          position_name: positionName,
        });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save position');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-form">
      <h2>{position ? 'Edit Position' : 'Add New Position'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="positionCode">Position Code</label>
          <input
            type="text"
            id="positionCode"
            value={positionCode}
            onChange={(e) => setPositionCode(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g., DEV001"
          />
        </div>

        <div className="form-group">
          <label htmlFor="positionName">Position Name</label>
          <input
            type="text"
            id="positionName"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g., Software Developer"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : position ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PositionForm;
