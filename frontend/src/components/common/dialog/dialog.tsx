import React from 'react'
import { Button } from '../button/button'
import { clsx } from 'clsx'

export function MyDialog({ title, setOpen, open, children, className, onCancel, onOk } : props) {
  if (!open)
    return <></>;

    return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 h-screen bg-black opacity-35"></div>
        <div className="fixed inset-0 h-screen flex justify-center" onClick={() => { setOpen(false) }}>
          <div className={clsx(className, "h-fit bg-white rounded-md mt-10")} onClick={(e) => e.stopPropagation()}>
            {/* Title */}
            <div className='p-3 border-gray-light border-b-2 relative'>
              <p className="text-black font-bold inline">{title}</p>
              <a role='button' className='absolute right-2 inline' onClick={() => setOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </a>
            </div>
            {/* Content */}
            <div className="p-2 border-b-2 border-gray-light">
              {children}
            </div>
            {/* Footer */}
            <div className='flex justify-end p-2'>
              <Button className='text-white bg-purple px-5' onClick={() => { setOpen(false); onOk(); }}>
                Ok
              </Button>
              <Button className='bg-purple text-purple' onClick={() => { setOpen(false); onCancel(); }}>
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
  children: React.ReactNode,
  onOk: Function,
  onCancel: Function,
  className: string
}
