import { VFC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from '../../styles/components/ui/SearchForm.module.scss';

type UseFormInputs = {
  search: string;
};

export const SearchForm: VFC = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<UseFormInputs>();

  const onSubmit = (data: UseFormInputs) => {
    const value = data.search;
    if (value === '') return;

    router.push(`/search/${value}`);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.form__input}
        type="text"
        {...register('search')}
      />
      <button className={styles.form__button} aria-label="検索する">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.form__search}
          role="img"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};
