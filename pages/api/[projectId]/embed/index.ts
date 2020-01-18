export default async (req, res) => {
  const { projectId } = req.query;
  const controls = req.query.controls === "true";
  const autoplay = req.query.autoplay !== "false";

  res.setHeader("Content-Type", "text/html");
  res.end(`<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        background: #000;
      }
      #project {
        background: #fff;
      }
    </style>
    <link rel="stylesheet" href="https://pulljosh.github.io/scratch-js/scratch-js/index.css" />
  </head>
  <body>
    ${controls ? `<button id="greenFlag">Green Flag</button>` : ""}
    <div id="project"></div>

    <script type="module">
      import project from "/api/${projectId}/embed/index/index.mjs";
    
      project.attach("#project");${
        controls
          ? `

      document.querySelector("#greenFlag").addEventListener("click", () => {
        project.greenFlag();
      });
`
          : ""
      }
      ${autoplay ? "project.greenFlag();" : ""}
    </script>
  </body>
</html>`);
};
