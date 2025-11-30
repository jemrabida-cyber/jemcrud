import api from './api';

export interface Position {
  position_id: number;
  position_code: string;
  position_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePositionDto {
  position_code: string;
  position_name: string;
}

export interface UpdatePositionDto {
  position_code?: string;
  position_name?: string;
}

export const positionsService = {
  async getAll(): Promise<Position[]> {
    const response = await api.get('/positions');
    return response.data;
  },

  async getOne(id: number): Promise<Position> {
    const response = await api.get(`/positions/${id}`);
    return response.data;
  },

  async create(data: CreatePositionDto): Promise<Position> {
    const response = await api.post('/positions', data);
    return response.data;
  },

  async update(id: number, data: UpdatePositionDto): Promise<Position> {
    const response = await api.patch(`/positions/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/positions/${id}`);
  },
};
