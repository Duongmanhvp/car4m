'use client'

import type { NextPage } from 'next';
import Map from './map';

const MapPage: NextPage = () => {
    const latitude = 10.0355; // Tọa độ lấy từ OpenCage API
    const longitude = 105.7765;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">OpenStreetMap với Leaflet.js</h1>
            <div className='w-[200px] h-[200px]'>
                <Map latitude={latitude} longitude={longitude} />
            </div>
           
        </div>
    );
};

export default MapPage;
