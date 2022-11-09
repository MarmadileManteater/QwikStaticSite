import { component$ } from '@builder.io/qwik';
import headerImage from '../../images/marmadilemanteater.png';

export default component$(() => {

  return (
    <header>
      <img src={headerImage} style="margin-left: auto; margin-right: auto;" />
    </header>
  );
});
