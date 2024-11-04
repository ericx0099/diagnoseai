import Image from "next/image";

interface ProfilePicProps {
  src: string;
  width?: number;
  height?: number;
}

const ProfilePic = ({ src, width = 150, height = 150 }: ProfilePicProps) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={"Profile Picture"}
      style={{ borderRadius: "50%" }}
    />
  );
};

export default ProfilePic;
