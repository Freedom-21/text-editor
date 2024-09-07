const useDateFormatter = () => {
  const formatDate = (date: string) => {
    const newDate = new Date(date);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[newDate.getMonth()];
    const day = newDate.getDate();
    const year = newDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  };

  return formatDate;
};

export default useDateFormatter;
