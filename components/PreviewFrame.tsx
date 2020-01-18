export default function PreviewFrame({ id }) {
  const embedURL = `/api/${id}/embed/`;

  return (
    <iframe className="PreviewFrame" src={embedURL} scrolling="no">
      <style jsx>
        {`
          .PreviewFrame {
            width: 480px;
            height: 360px;
            border: none;
            border-radius: 8px;
            overflow: hidden;
          }
        `}
      </style>
    </iframe>
  );
}
