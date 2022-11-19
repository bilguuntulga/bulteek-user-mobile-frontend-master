const initialState = {
  categories: [],
  plan: [],
  banners: [],
  public_movies: [],
  s3Host:process.env.NODE_ENV === "development" ? "http://128.199.251.233" : "https://cdn.bulteek.mn"
};

const makeMappedCategories = (payload) => {
  const mapped = payload.reduce(
    (accumilator, iterator) => ({
      ...accumilator,
      [iterator._id]: iterator,
    }),
    {}
  );

  return mapped;
};

const general = (state = initialState, action) => {
  switch (action.type) {
    case "general/init": {
      const { categories, plans, banners } = action.payload;
      return {
        ...state,
        categories,
        plans,
        banners: banners || [],
      };
    }
    case "general/categories": {
      const { categories } = action.payload;
      return {
        ...state,
        categories:
          categories.length > 1
            ? categories.sort((a, b) => a.sort - b.sort)
            : categories,
      };
    }

    case "general/public_movie": {
      const { public_movies, top_movies } = action.payload;
      return {
        ...state,
        public_movies,
        top_movies
      };
    }
    case "general/category": {
      return {
        ...state,
        mappedCategories: makeMappedCategories(action.payload),
      };
    }
    default:
      return state;
  }
};

export default general;
