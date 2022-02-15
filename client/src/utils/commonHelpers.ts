export const shortenBigNum = (num: number) =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num);

export const formatDate = (date: string): string => {
  const myDate = new Date(date);
  const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][
    myDate.getMonth()
  ];
  const formatedDate = myDate.getDate() + ' ' + month + ', ' + myDate.getFullYear();
  return formatedDate;
};
