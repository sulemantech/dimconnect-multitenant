import { useState, useContext , useEffect } from 'preact/hooks';
import { createContext } from 'preact';
import { Drawer } from '@mantine/core';
import { signal } from '@preact/signals';
const DrawerContext = createContext();

const drawerSignal = signal({});

export const DrawerProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState();
    const [title, setTitle] = useState('');

    const openDrawer = ({ title, children }) => {
        if (!title || !children) return;
        setIsOpen(true);
        setTitle(title);
        setContent(children);
    };

    const close = () => {
        drawerSignal.value = { title: null, children: null };
    };

    useEffect(() => {
       const unsub =  drawerSignal.subscribe((data) => {
            
            if (!data.title || !data.children) {
                setIsOpen(false);
                return;
            }
            openDrawer(data);
        });
        return () => {
            unsub();
        }
    }, []);

    return (
        <DrawerContext.Provider value={openDrawer}>
            {children}
            <Drawer
                opened={isOpen}
                onClose={close}
                title={title}
                size="lg"
                padding="md"
                position='right'
                
            >
                {content}
            </Drawer>
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => useContext(DrawerContext);

export const openDrawer = ({ title, children }) => {
    
    drawerSignal.value = { title, children };
}

export const closeDrawer = () => {
    drawerSignal.value = { title: '', children: '' };
}

export default DrawerProvider;