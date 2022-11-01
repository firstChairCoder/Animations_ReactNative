const superheroes = [
  {
    backgroundColor: "#CC1C2A",
    key: "spiderman",
    header: "spider\nman",
    imgSrc: require("../../assets/images/heroes/spiderman.png"),
    movieImgSrc: [
      require("../../assets/images/heroes/spider-man-movie-1.jpg"),
      require("../../assets/images/heroes/spider-man-movie-2.jpg"),
    ],
    style: { height: 300, width: 329 },
    name: "peter parker",
    bodyText:
      "In Forest Hills, Queens, New York, Midtown High School student Peter Benjamin Parker is a science-whiz orphan living with his Uncle Ben and Aunt May. He is bitten by a radioactive spider at a science exhibit and acquires the agility and proportionate strength of an arachnid.",
  },
  {
    backgroundColor: "#DA9403",
    key: "ironman",
    imgSrc: require("../../assets/images/heroes/iron-man.png"),
    style: { height: 350, width: 350 },
    movieImgSrc: [
      require("../../assets/images/heroes/iron-man-movie-1.jpg"),
      require("../../assets/images/heroes/iron-man-movie-2.jpg"),
    ],
    header: "iron\nman",
    name: "tony stark",
    bodyText:
      "Anthony Edward Stark is the son of wealthy industrialist and head of Stark Industries, Howard Stark, and Maria Stark. A boy genius, he enters MIT at the age of 15 to study engineering and later receives master's degrees in engineering and physics. After his parents are killed in a car accident, he inherits his father's company.",
  },
  {
    backgroundColor: "#000000",
    key: "black-widow",
    imgSrc: require("../../assets/images/heroes/black-widow.png"),
    style: { height: 300, width: 222 },
    movieImgSrc: [
      require("../../assets/images/heroes/black-widow-movie-1.jpg"),
      require("../../assets/images/heroes/black-widow-movie-2.jpg"),
    ],
    header: "black\nwidow",
    name: "natasha romanova",
    bodyText:
      'Natasha was born in Stalingrad (now Volgograd), Russia. The first and best-known Black Widow is a Russian agent trained as a spy, martial artist, and sniper, and outfitted with an arsenal of high-tech weaponry, including a pair of wrist-mounted energy weapons dubbed her "Widow\'s Bite".',
  },
  {
    backgroundColor: "#00579B",
    key: "captain-america",
    imgSrc: require("../../assets/images/heroes/captain-america.png"),
    style: { height: 300, width: 222 },
    movieImgSrc: [
      require("../../assets/images/heroes/captain-america-movie-1.jpg"),
      require("../../assets/images/heroes/captain-america-movie-2.jpg"),
    ],
    header: "captain\namerica",
    name: "steve rogers",
    bodyText:
      "Steven Rogers was born in the Lower East Side of Manhattan, New York City, in 1920 to poor Irish immigrants, Sarah and Joseph Rogers. Joseph died when Steve was a child, and Sarah died of pneumonia while Steve was a teen. By early 1940, before America's entry into World War II, Rogers is a tall, scrawny fine arts student specializing in illustration and a comic book writer and artist.",
  },
  {
    backgroundColor: "#660C1D",
    key: "scarlet-witch",
    imgSrc: require("../../assets/images/heroes/scarlet-witch.png"),
    style: { height: 300, width: 163 },
    movieImgSrc: [
      require("../../assets/images/heroes/scarlet-witch-movie-1.jpg"),
      require("../../assets/images/heroes/scarlet-witch-movie-2.jpg"),
    ],
    header: "scarlet\nwitch",
    name: "wanda maximoff",
    bodyText:
      "Magda, the wife of Magneto, escapes from him while pregnant and takes sanctuary at Mount Wundagore in Transia, the home of the High Evolutionary. She gave birth to twins, Wanda and Pietro. The Elder God Chthon altered Wanda at birth and gave her the ability to use magic in addition to her mutant abilities, planning to use her as a vessel when her powers reached maturity.",
  },
  {
    backgroundColor: "#333333",
    key: "black-panther",
    imgSrc: require("../../assets/images/heroes/black-panther.png"),
    style: { height: 300, width: 237 },
    movieImgSrc: [
      require("../../assets/images/heroes/black-panther-movie-1.jpg"),
      require("../../assets/images/heroes/black-panther-movie-2.jpg"),
    ],
    header: "black\npanther",
    name: "king t'challa",
    bodyText:
      "The Black Panther is the ceremonial title given to the chief of the Panther Tribe of the advanced African nation of Wakanda. In addition to ruling the country, he is also chief of its various tribes (collectively referred to as the Wakandas). The Panther habit is a symbol of office (head of state) and is used even during diplomatic missions.",
  },
  {
    backgroundColor: "#908548",
    key: "hulk",
    imgSrc: require("../../assets/images/heroes/hulk.png"),
    style: { height: 300, width: 348 },
    movieImgSrc: [
      require("../../assets/images/heroes/hulk-movie-1.jpeg"),
      require("../../assets/images/heroes/hulk-movie-2.jpg"),
    ],
    header: "the\nhulk",
    name: "bruce banner",
    bodyText:
      "During the experimental detonation of a gamma bomb, scientist Robert Bruce Banner saves teenager Rick Jones who has driven onto the testing field; Banner pushes Jones into a trench to save him, but is hit with the blast, absorbing massive amounts of gamma radiation. He awakens later seemingly unscathed, but that night transforms into a lumbering grey form.",
  },
];

export default superheroes;
