import { useEffect, useMemo, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

import Box from '@mui/material/Box';

export default function MapDirections({ startPos, destPos }) {
  const center = useMemo(
    () => ({ lat: 35.92143223969268, lng: -79.06361405386014 }),
    []
  );
  const [directions, setDirections] = useState();
  const fetchDirections = (start, end) => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          let meters = result.routes[0].legs[0].distance.value;
          let seconds = result.routes[0].legs[0].duration.value;
          let startAddress = result.routes[0].legs[0].start_address;
          let endAddress = result.routes[0].legs[0].end_address;
          console.log('🚙', meters / 1900);
          console.log('⏰', seconds);
          console.log('🚪', startAddress);
          console.log('📍', endAddress);
        }
      }
    );
  };

  useEffect(() => {
    fetchDirections(startPos, destPos);
  }, [startPos, destPos]);

  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    draggable: false,
    // styles: [
    //   // {
    //   //   featureType: 'all',
    //   //   stylers: [{ color: '#C0C0C0' }],
    //   // },
    //   {
    //     featureType: 'road',
    //     stylers: [{ color: '#F5B935' }],
    //   },
    //   // {
    //   //   featureType: 'landscape',
    //   //   elementType: 'labels',
    //   //   stylers: [{ visibility: 'off' }],
    //   // },
    //   {
    //     featureType: 'landscape',
    //     elementType: 'geometry',
    //     stylers: [{ color: '#F6C7D4' }],
    //   },
    //   { featureType: 'water', stylers: [{ color: '#11ABC1' }] },
    // ],
    //https://developers.google.com/maps/documentation/javascript/style-reference
  }));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '300px',
          height: '300px',
        }}
      >
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          options={options}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 12,
                  strokeColor: '#11ABC1',
                  strokeWeight: 4,
                },
                markerOptions: {
                  clickable: false,
                },
              }}
            />
          )}
        </GoogleMap>
      </Box>
    </>
  );
}
