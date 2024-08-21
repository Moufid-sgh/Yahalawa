'use client'


import { deleteItems } from '@/app/actions/menuItems-action';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="m-3 p-1.5 w-52 border border-gray shadow-md bg-white flex menuList-center justify-between rounded-md hover:shadow-lg duration-300"
    >
      <p>{title}</p>
      <form action={deleteItems.bind(null, id)}>
        <button type='submit' className='cursor-pointer text-red hover:font-bold duration-300'>&#10005;</button>
      </form>

    </li>
  );
};
