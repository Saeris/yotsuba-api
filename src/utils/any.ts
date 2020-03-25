export const any = <T>(promises: Promise<T>[]) =>
  Promise.all(
    promises.map(promise =>
      // eslint-disable-next-line
      promise.then(
        val => {
          throw val;
        },
        reason => reason
      )
    )
    // eslint-disable-next-line
  ).then(
    reasons => {
      throw reasons;
    },
    firstResolved => firstResolved
  );
