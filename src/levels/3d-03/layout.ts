import type { Vec3 } from '@/domain/view/view-check';

export const CAKES: readonly {
  id: string;
  position: Vec3;
  width: number;
  height: number;
  color: string;
}[] = [
  {
    id: 'cake-1',
    position: [-0.56, 0.955, 0.56],
    width: 1.04,
    height: 0.3,
    color: '#4e8045',
  },
  {
    id: 'cake-2',
    position: [0.56, 0.955, 0.56],
    width: 1.04,
    height: 0.3,
    color: '#65954d',
  },
  {
    id: 'cake-3',
    position: [-0.56, 0.955, -0.56],
    width: 1.04,
    height: 0.3,
    color: '#65954d',
  },
  {
    id: 'cake-4',
    position: [0.56, 0.955, -0.56],
    width: 1.04,
    height: 0.3,
    color: '#4e8045',
  },
  {
    id: 'cake-5',
    position: [0, 0.43, 0],
    width: 1.4,
    height: 0.7,
    color: '#83a653',
  },
];
