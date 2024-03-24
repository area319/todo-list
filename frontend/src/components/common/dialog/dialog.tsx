import React from 'react'
import { FocusEventHandler } from 'react';
import { Typography } from "antd";
import { Button } from '../button/button';
import { BUILD_ID_FILE } from 'next/dist/shared/lib/constants';

export default function MyDialog(props: props) {
  if (!props.open)
    return <></>;
  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 h-screen bg-black opacity-35"></div>
        <div className="fixed inset-0 h-screen flex justify-center" onClick={ () => {props.setOpen(false)}}>
          <div className="w-1/3 h-fit bg-white rounded-md mt-10" onClick={(e) => e.stopPropagation()}>
            {/* Title */}
            <div className='p-3 border-gray-light border-b-2'>
              <p className="text-black font-bold ">{props.title}</p>
            </div>
            {/* Content */}
            <div className="p-3 border-b-2 border-gray-light">
              {props.children}
            </div>
            {/* Footer */}
            <div className='flex justify-end p-3'>
              <Button className='text-white bg-blue'>
                Ok
              </Button>
              <Button className='bg-gray-light text-blue'>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type props = {
  open: boolean,
  setOpen: Function,
  title: string,
  children: React.ReactNode[]
}
