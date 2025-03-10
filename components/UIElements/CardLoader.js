import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const CardLoader = ({color, icon, name}) => {
    return (
        <>
        
        <div class="card-box widget-user">
            <div class="media">
                <div class="avatar-lg mr-3">
                    <Skeleton>
                        {icon}
                    </Skeleton>
                </div>
                <div class="media-body overflow-hidden">
                    <Skeleton>
                        <h5 class="mt-0 mb-1">{name}</h5>
                    </Skeleton>
                    <div class="dropdown-divider"></div>
                    <big class={color}>
                        <Skeleton>
                            <b>...</b>
                        </Skeleton>
                        
                    </big>
                    <div class="dropdown-divider"></div>
                    <Skeleton>
                        <small class='text-dark'>{'View all >>'} </small>
                    </Skeleton>
                    
                </div>
            </div>
        </div>
        </>
    );
};

export default CardLoader;
