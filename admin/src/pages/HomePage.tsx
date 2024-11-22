import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import ExcelToJsonConverter from './ExcelToJsonConverter'
import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <ExcelToJsonConverter/>
      {/* <h1>Welcome to {formatMessage({ id: getTranslation('plugin.name') })}</h1> */}
    </Main>
  );
};

export { HomePage };
