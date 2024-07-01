interface FileIconProps {
  extension: string;
  imageSrc?: string;
  className?: string;
}

export function FileIcon({ extension, imageSrc, className }: FileIconProps) {
  extension = extension.toLowerCase();

  if (imageSrc) {
    return (
      <svg className={className} width="100%" height="100%" viewBox="0 0 25 25">
        <rect
          x={0.5}
          y={0.5}
          width={24}
          height={24}
          strokeWidth={1}
          className="fill-white stroke-gray-300"
        />
        <image
          href={imageSrc}
          x={2}
          y={2}
          width={21}
          height={21}
          preserveAspectRatio="xMidYMid"
        />
      </svg>
    );
  }

  return (
    <svg className={className} width="100%" height="100%" viewBox="0 0 25 32">
      <rect x={0} y={0} width={25} height={32} rx={2} className="fill-white" />
      <g>
        {new Array(7).fill(null).map((_, i) => (
          <rect
            key={i}
            x={2}
            y={3 + i * 4}
            width={i === 6 ? 10.5 : 21}
            height={2}
            className="fill-gray-300"
          />
        ))}
      </g>
      {extension === "js" && (
        <g>
          <rect
            x={6}
            y={10}
            width={12}
            height={12}
            rx={2}
            className="fill-yellow-500"
          />
          <text
            x={12.5}
            y={16}
            style={{
              fontFamily: "'Arial-BoldMT', 'Arial', sans-serif",
              fontWeight: 700,
              fontSize: 8,
            }}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-black"
          >
            JS
          </text>
        </g>
      )}
      {extension === "html" && (
        <g>
          <rect
            x={4}
            y={10}
            width={16}
            height={12}
            rx={2}
            className="fill-blue-700"
          />
          <text
            x={12.5}
            y={16}
            style={{
              fontFamily: "'Arial-BoldMT', 'Arial', sans-serif",
              fontWeight: 700,
              fontSize: 5,
            }}
            dx={-0.5}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white"
          >
            HTML
          </text>
        </g>
      )}
    </svg>
  );
}

interface DirectoryIconProps {
  imageSrc?: string;
}

export function DirectoryIcon({ imageSrc }: DirectoryIconProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 32">
      <path
        d="M0,2.346L0,27.725C0,30.084 1.916,32 4.275,32L35.725,32C38.084,32 40,30.084 40,27.725L40,7.775C40,5.416 38.084,3.5 35.725,3.5L19.2,3.5C18.538,3.5 18,2.962 18,2.3L18,2.286L17.999,2.286C17.968,1.019 16.929,0 15.654,0L2.346,0C1.051,0 0,1.051 0,2.346Z"
        className="fill-gray-600"
      />
      <rect
        x={0}
        y={6}
        width={40}
        height={26}
        rx={4}
        className="fill-gray-500"
      />
      {imageSrc && (
        <image
          href={imageSrc}
          x={3}
          y={9}
          width={34}
          height={20}
          preserveAspectRatio="xMidYMid"
        />
      )}
    </svg>
  );
}

interface SmallFileIconProps {
  className?: string;
  showPlus?: boolean;
  showLines?: boolean;
  ext?: string;
}

export function SmallFileIcon({
  className,
  showPlus,
  showLines,
  ext,
}: SmallFileIconProps) {
  const extColors: Record<string, string> = {
    html: "fill-blue-700",
    js: "fill-yellow-600",
  };
  const defaultColor = "fill-gray-500";

  const colorClassName =
    (typeof ext === "string" && extColors[ext]) || defaultColor;

  return (
    <svg className={className} viewBox="0 0 48 48">
      <rect
        x={12}
        y={8}
        width={24}
        height={32}
        rx={3}
        className={colorClassName}
      />
      {showLines && (
        <>
          <rect className="fill-white" x={16} y={13} width={16} height={3} />
          <rect className="fill-white" x={16} y={20} width={16} height={3} />
          <rect className="fill-white" x={16} y={27} width={8} height={3} />
        </>
      )}
      {showPlus && (
        <>
          <rect x={22} y={16} width={4} height={16} className="fill-white" />
          <rect x={16} y={22} width={16} height={4} className="fill-white" />
        </>
      )}
    </svg>
  );
}

interface SmallDirectoryIconProps {
  className?: string;
  showPlus?: boolean;
}

export function SmallDirectoryIcon({
  className,
  showPlus,
}: SmallDirectoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <rect
        x={8}
        y={8}
        width={14}
        height={8}
        rx={3}
        className="fill-gray-500"
      />
      <rect
        x={8}
        y={12}
        width={32}
        height={24}
        rx={3}
        className="fill-gray-500"
      />
      {showPlus && (
        <>
          <rect x={22} y={16} width={4} height={16} className="fill-white" />
          <rect x={16} y={22} width={16} height={4} className="fill-white" />
        </>
      )}
    </svg>
  );
}
