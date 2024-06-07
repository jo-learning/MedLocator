import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const PopupModal = ({shows, message, statusCode}) => {
    const [show, setShow] = useState(false);
    console.log('it is running')

    useEffect(() => {
        if (shows == true){
            setShow(shows);
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);
    
            return () => clearTimeout(timer);
        }
        else{}
        
    }, [shows]);

    return (
        <Modal
            show={show}
            onClose={() => setShow(false)}
            className="fixed right-0 bottom-0 z-50 w-full p-4 bg-transparent overflow-y-auto"
        >
            <Modal.Header>
                {
                    statusCode == 200 && (
                        <FaCheckCircle size={30} color="green"  className="ml-[200px]"/>
                    )
                }
                {
                    statusCode != 200 && (
                        <FaExclamationCircle size={30} color="red" className="ml-[200px]" />
                    )
                }
            
            

            </Modal.Header>
            <Modal.Body>
                <div className="flex text-center justify-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PopupModal;
