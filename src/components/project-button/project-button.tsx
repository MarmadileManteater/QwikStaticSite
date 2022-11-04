import { component$, Slot } from '@builder.io/qwik';

interface IProps {
    link: string;
    target: string;
}

export default component$(({ link, target } : IProps) => {
  return (
    <a
      href={link}
      target={target}
      class="p-3 inline-block "
    ><Slot /> &raquo;</a>
  );
});
