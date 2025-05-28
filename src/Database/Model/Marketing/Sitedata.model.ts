import mongoose from "mongoose";

const SitedataSchema = new mongoose.Schema(
  {
    Header: {
      LogoSrc: String,
      Title: String,
      description: String,
      ASKUS: String,
      buttonone: String,
      buttontwo: String,
      buttontwourl: String,
      anchortagone: String,
      navigation: [
        {
          name: String,
          href: String,
        },
      ],
    },

    Poster: {
      PosterImages: [
        {
          url: String,
        },
      ],
    },

    service: {
      ourServic: [
        {
          title: String,
          imgUrl: String,
          description: String,
          button: String,
          href: String,
        },
      ],
    },

    Team: {
      people: [
        {
          id: Number,
          name: String,
          role: String,
          imageUrl: String,
        },
      ],
    },

    CustomerReview: {
      title: String,
      titledetial: String,
      posts: [
        {
          id: Number,
          title: String,
          href: String,
          description: String,
          date: String,
          datetime: String,
          category: {
            title: String,
            href: String,
          },
          author: {
            name: String,
            role: String,
            brandName: String,
            href: String,
            imageUrl: String,
          },
        },
      ],
    },

    BookConsultant: {
      headingone: String,
      headingtwo: String,
      submitButton: String,
      thankyou: String,
      thankyoumesage: String,
    },

    FooterData: {
      CompanyTitle: String,
      FooterContent: [
        {
          ListTitle: String,
          List: [
            {
              name: String,
              href: String,
              docName: String,
            },
          ],
        },
      ],
      year: String,
      AllRight: String,
      SocialIcons: [
        {
          name: String,
          href: String,
          svg: String,
        },
      ],
    },

    aboutus: {
      headingone: String,
      headingonedecrption: String,
      yearofexp: String,
      YearsofExperience: String,
      pcount: String,
      projectcount: String,
      totalcountclient: String,
      happyclient: String,
      imageone: String,
      imagetwo: String,
      imagethree: String,
      headingtwo: String,
      headingtwodescriiption: String,
    },

    CareerPage: {
      Brandname: String,
      brandlogolink: String,
      CEONAME: String,
      Messagefromceo: String,
      position: String,
      personimg: String,
      FormDetail: {
        submitbutton: String,
        formhead: String,
        formheaddesc: String,
      },
    },
  },
  { collection: "sitedata" }
);

const SitedataModel = mongoose.model("sitedata", SitedataSchema);

export default SitedataModel;
