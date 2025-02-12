import { Bars3Icon, QueueListIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import {
  Button,
  Drawer,
  FooterDivider,
  Sidebar,
  Clipboard,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FlipInput } from "./FlipInput";
import "../reuse.css";
import { useAuth } from "../provider/authProvider";
import Avatar from "react-avatar";
import { updateUser } from "../api/profile";

export const MainSidebar = () => {
  const handleClose = () => setIsOpen(false);
  const { cookies, updateCredits } = useAuth();
  const { name, email, organizationId } = cookies.userData.record;
  const { token } = cookies.userData;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, changeClientName] = useState(name);

  const submitCallback = async () => {
    const formData = new FormData();
    formData.append("name", clientName);
    const newData = await updateUser(cookies.userData.record, formData, token);
    await updateCredits(newData);
  };

  return (
    <>
      <div className='flex items-center justify-center absolute top-5 left-5'>
        <Button
          onClick={() => setIsOpen(true)}
          color='light'
          className='rounded-sm'
        >
          <Bars3Icon className='h-5 w-5' />
        </Button>
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        className='absolute'
        color='dark'
      >
        <Drawer.Header title='Menu'></Drawer.Header>
        <Drawer.Items>
          <Sidebar color='dark'>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item>
                  <div className='flex flex-col gap-0.5'>
                    <Avatar
                      name={name}
                      size={40}
                      textSizeRatio={3}
                      className='mb-2'
                    />
                    <FlipInput
                      value={clientName}
                      onChange={changeClientName}
                      submitCallback={submitCallback}
                      text={name}
                    />
                    <span>{email}</span>
                  </div>
                </Sidebar.Item>
                <FooterDivider />
                <Sidebar.Item
                  onClick={() => setIsOpen(false)}
                  className='listItem'
                >
                  <Link to={"/meetings"} onClick={() => setIsOpen(false)}>
                    <div className='flex gap-2'>
                      <QueueListIcon width={"20"} />
                      View Meetings
                    </div>
                  </Link>
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => setIsModalOpen(true)}
                  className='listItem'
                >
                  <div className='relative'>
                    <input
                      id='shortlink'
                      type='text'
                      className='col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      value='Copy invite link'
                      disabled
                      readOnly
                    />
                    <Clipboard.WithIcon
                      valueToCopy={`http://localhost:5173?reg=1&org=${organizationId}`}
                    />
                  </div>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};
