import { PuzzlePiece } from '@strapi/icons';
import mhg from '../pages/MHG-logo.svg';

const PluginIcon = () =>   <img
src={mhg}
style={{
  border: '1px solid white',
  width: '2.5rem',
  height: '2.5rem'
}}
/>;

export { PluginIcon };
