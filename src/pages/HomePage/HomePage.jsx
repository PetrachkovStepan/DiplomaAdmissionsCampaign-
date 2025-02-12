import { Label, List } from "flowbite-react";
import { useAuth } from "../../provider/authProvider";
import {
  PlusCircleIcon,
  QueueListIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import "../../reuse.css";
import { useEffect, useState } from "react";

export const Homepage = () => {
  const { cookies } = useAuth();

  return (
    <>
      <div className='w-full h-full grid place-items-center'>
        <div className='flex gap-16 flex-col'>
          <Label
            value={`Welcome back, ${cookies.userData.record.name}`}
            className='text-5xl text-gray-600 select-none'
          />
          <List className=' text-xl flex flex-col gap-3 w-fit'>
            <List.Item icon={QueueListIcon} className='listItem'>
              <Link to={"/meetings"}>View Meetings</Link>
            </List.Item>
            <List.Item icon={PlusCircleIcon} className='listItem'>
              Start Meeting
            </List.Item>
            <List.Item
              onClick={() => setIsModalOpen(true)}
              icon={UserPlusIcon}
              className='listItem'
            >
              Invite Member
            </List.Item>
          </List>
        </div>
      </div>
    </>
  );
};
