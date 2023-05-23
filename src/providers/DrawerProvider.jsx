import { useState, useContext , useEffect } from 'preact/hooks';
import { createContext } from 'preact';
import { Drawer } from '@mantine/core';
import { signal } from '@preact/signals';
const DrawerContext = createContext();

const drawerSignal = signal({
    openDrawer: ({ title, children }) => {
        return { title, children };
    },
});

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
        setIsOpen(false);
    };

    useEffect(() => {
        drawerSignal.subscribe((data) => {
            if (!data.title || !data.children) {
                close();
                return;
            }
            openDrawer(data);
        });
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