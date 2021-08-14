import { useLocation } from 'react-router-dom';

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default useQueryParams;
