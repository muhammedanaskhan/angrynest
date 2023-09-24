export const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      darkimgURL: "/assets/home_dark.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      darkimgURL: "/assets/search_dark.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      darkimgURL: "/assets/heart_dark.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      darkimgURL: "/assets/create_dark.svg",
      route: "/create-thread",
      label: "Create Thread",
    },

    {
      imgURL: "/assets/user.svg",
      darkimgURL: "/assets/user_dark.svg",
      route: "/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Followers", icon: "/assets/members.svg" },
    { value: "tagged", label: "Following", icon: "/assets/members.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];