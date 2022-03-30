import React from 'react'
import { Typography } from '@material-ui/core'


import './Title.css'

export default function Title({children, name}) {
    return (
        <div className='title' >
            {children}
            <Typography style={{marginLeft: '8px'}} className='text' variant='h5' >
                {name}
            </Typography>
        </div>
    )
}
