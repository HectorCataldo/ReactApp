import { CopyOutlined,
        FileExcelOutlined,
        FileTextOutlined,
        FireOutlined,
        HomeOutlined,
        SafetyCertificateOutlined,
        ScheduleOutlined,
        StockOutlined,
         UserOutlined 
        }                                   from '@ant-design/icons';
import React                                from 'react'            ;
import { FaUsers}                           from "react-icons/fa"   ;
import { IoPersonAdd }                      from "react-icons/io5"  ;
import { AiFillCaretDown, AiFillCaretUp}    from "react-icons/ai"   ;
import { PiFilesLight }                     from "react-icons/pi"   ;




export const SidebarData = [
    {
        title   : 'Inicio',
        path    : '/',
        icon    : <HomeOutlined />
    },
    {
        title       : 'Clientes',
        path        : '#',
        icon        : <UserOutlined />,
        iconClosed  : <AiFillCaretDown/>,
        iconOpened  : <AiFillCaretUp />,
        subNav:[
            {
                title: 'Lista de Clientes',
                path : '/ApClients',
                icon : <FaUsers />
            },
            {
                title: 'Registrar Cliente',
                path : '/registro',
                icon : <IoPersonAdd />
            }
        ]
    },
    {
        title   : 'Cotizaciones',
        path    : '/Quotationlist',
        icon    : <CopyOutlined/>
    },
    {
        title       : 'Pólizas',
        path        : '#',
        icon        :  <FileTextOutlined/>,
        iconClosed  : <AiFillCaretDown/>,
        iconOpened  : <AiFillCaretUp />,
        subNav:[
            {
                title: 'Lista de Pólizas',
                path : '/policylist',
                icon : <PiFilesLight />
            },
        ]
    },
    {
        title   : 'Endosos',
        path    : '/PANTALLA',
        icon    :  <FileExcelOutlined/>
    },
    {
        title   : 'Cobranzas',
        path    : '/PANTALLA',
        icon    :  <StockOutlined/>
    },
    {
        title   : 'Siniestros',
        path    : '/Claimlist',
        icon    :  <FireOutlined/>
    },
    {
        title   : 'Reservas',
        path    : '/PANTALLA',
        icon    :  <ScheduleOutlined/>
    },
    {
        title   : 'Reaseguro',
        path    : '/PANTALLA',
        icon    :  <SafetyCertificateOutlined/>
    }
]