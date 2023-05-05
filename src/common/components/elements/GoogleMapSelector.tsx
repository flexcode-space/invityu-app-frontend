import { FC, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDebounce } from 'usehooks-ts';
import Input from '../form/Input';

interface GoogleMapSelectorProps {
  onSelectLocation: (lat: number, lng: number) => void;
}

const GOOGLE_MAPS_API = 'AIzaSyD_d303Hju4uSgTBnouAiBC8Up_kCrKO5o';

const GoogleMapSelector: FC<GoogleMapSelectorProps> = ({ onSelectLocation }) => {
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce<string>(searchTerm, 500);

  const handleApiLoaded = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleMapClick = (event: any) => {
    const { lat, lng } = event;
    if (marker) {
      marker.setMap(null);
    }
    if (map) {
      const newMarker = createMarker(map, lat, lng);
      setMarker(newMarker);
      onSelectLocation(lat, lng);
    }
  };

  const createMarker = (map: google.maps.Map, lat: number, lng: number) => {
    return new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map,
    });
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearch = async () => {
    if (!searchTerm || !map) {
      return;
    }
    const geocoder = new google.maps.Geocoder();
    const result = await new Promise<google.maps.GeocoderResult | null>((resolve) => {
      geocoder.geocode({ address: searchTerm }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      });
    });
    if (result) {
      const { lat, lng } = result.geometry.location;
      if (marker) {
        marker.setMap(null);
      }
      const newMarker = createMarker(map, lat(), lng());
      setMarker(newMarker);
      map.panTo(result.geometry.location);
      onSelectLocation(lat(), lng());
    }
  };

  useEffect(() => {
    console.log('aulianza fetch now');
    handleSearch();
  }, [debouncedValue]);

  return (
    <div className="w-full h-[300px] mb-32">
      <Input
        label="Google Map"
        required={false}
        name="gmaps"
        placeholder="Cari lokasi acara atau geser di peta"
        type="text"
        value={searchTerm}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearchTermChange(event)}
      />
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API }}
        defaultCenter={{ lat: -6.175344774311696, lng: 106.82645069848633 }}
        defaultZoom={13}
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
        onClick={handleMapClick}
      />
    </div>
  );
};

export default GoogleMapSelector;
