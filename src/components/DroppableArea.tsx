import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import UserCard from './UserCard';
import { User } from '../types/User';

interface DroppableAreaProps {
  id: string;
  title: string;
  users: User[];
  className?: string;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ id, title, users, className }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        border-2 border-dashed rounded-lg p-6 min-h-96
        ${className}
        ${isOver ? 'border-solid bg-opacity-75' : ''}
        transition-all duration-200
      `}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-2">
        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {title === 'Available Users' ? 'No users available' : 'Drag users here to select them'}
          </div>
        ) : (
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default DroppableArea;