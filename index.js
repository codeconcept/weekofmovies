let calendar = new VanillaCalendar({
  selector: "#myCalendar",
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  shortWeekday: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  onSelect: (data, elem) => {
      console.log(data);
      console.log(elem);
  },
});
