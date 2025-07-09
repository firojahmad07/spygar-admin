import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';
import { AllProductsPage, } from '@/pages/store-admin';
import { 
    Users,
    CatalogMonitoring,
    ConfigurationPage,
    Roles,
    EditUser
}  from './Index';

const SystemIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'System Navigation' },
            { title: 'Catalog Monitoring', path: '/system/catalog-monitoring' },
            { title: 'Configuration', path: '/system/configuration' },

            { heading: 'User Management' },
            { title: 'User', path: '/system/users' },
            { title: 'Roles', path: '/system/roles' },
        ],
        []
    );
    
    useEffect(() => {
        if (context?.setSidebarMenu) {
            context.setSidebarMenu(sideBarMenuData);
        }
    }, [context]);

    return (
        <Routes>
            <Route>
                {/* System */}
                <Route path='/catalog-monitoring' element={ <CatalogMonitoring /> } />
                <Route path='/configuration' element={ <ConfigurationPage /> } />                
                {/* user navigation */}
                <Route path='/users' element={ <Users /> }/>
                <Route path='/user/:id/edit' element={ <EditUser /> }/>
                <Route path='/roles' element={ <Roles /> } />

            </Route>
            <Route index element={<Navigate to='/system/catalog-monitoring' />} />
        </Routes>
    )
}

export { SystemIndex } 
