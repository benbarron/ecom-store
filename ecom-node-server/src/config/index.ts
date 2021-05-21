import { development } from "./development";
import { production } from "./production";

export const config = () => {
  switch(process.env.NODE_ENV) {
    case 'production':
      return production()
    case 'development':
      return development();
    default:
      return development();
  }
};