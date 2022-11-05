import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';
import headerImage from '../../images/marmadilemanteater.png';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <img src={headerImage} style="margin-left: auto; margin-right: auto;" />
    </header>
  );
});
