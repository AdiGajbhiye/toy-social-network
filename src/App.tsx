import Posts from "./posts";

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <Posts
        posts={[
          {
            id: "a",
            userId: "b",
            message: "asd",
            createdAt: "asd",
            updatedAt: "asd",
          },
        ]}
      />
    </header>
  </div>
);

export default App;
