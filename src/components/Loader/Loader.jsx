import s from './Loader.module.css';
import { Watch } from 'react-loader-spinner';

function Loader() {
  return (
    <div className={s.LodContainer}>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="rgba(0, 255, 234, 0.815)"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
