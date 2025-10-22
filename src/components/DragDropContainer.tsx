import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import UserCard from './UserCard';
import DroppableArea from './DroppableArea';
import { User } from '../types/User';

const DragDropContainer: React.FC = () => {
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users: User[]) => {
        setAvailableUsers(users);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which list the item is currently in
    const activeUser = availableUsers.find(user => user.id.toString() === activeId) ||
                      selectedUsers.find(user => user.id.toString() === activeId);

    if (!activeUser) return;

    const isActiveInAvailable = availableUsers.some(user => user.id.toString() === activeId);
    const isActiveInSelected = selectedUsers.some(user => user.id.toString() === activeId);

    // Moving to Available Users
    if (overId === 'available-users') {
      if (isActiveInSelected) {
        setSelectedUsers(prev => prev.filter(user => user.id.toString() !== activeId));
        setAvailableUsers(prev => [...prev, activeUser]);
      }
    }
    // Moving to Selected Users
    else if (overId === 'selected-users') {
      if (isActiveInAvailable) {
        setAvailableUsers(prev => prev.filter(user => user.id.toString() !== activeId));
        setSelectedUsers(prev => [...prev, activeUser]);
      }
    }
  };

  const activeUser: User | undefined = availableUsers.find(user => user.id.toString() === activeId) ||
                    selectedUsers.find(user => user.id.toString() === activeId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading users...</div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DroppableArea
            id="available-users"
            title="Available Users"
            users={availableUsers}
            className="bg-blue-50 border-blue-200"
          />
          <DroppableArea
            id="selected-users"
            title="Selected Users"
            users={selectedUsers}
            className="bg-green-50 border-green-200"
          />
        </div>
      </div>

      <DragOverlay>
        {activeId && activeUser ? <UserCard user={activeUser} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragDropContainer;
