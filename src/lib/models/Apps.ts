import { model, models, Schema } from "mongoose";

const appSchema = new Schema({
  name: { type: String, required: true },
  discription: { type: String },
  icon: { type: String },
  url: { type: String, required: true },
  category: { type: String, default: "Featured" },
  featured: { type: Boolean, default: false },
});

const App = models.App || model("App", appSchema);

export default App;
