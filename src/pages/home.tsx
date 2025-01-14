import { useState } from "react";
import NavigationBar from "@/widgets/header";
import style from "@/styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setUploadedFileName(file.name);
      console.log("Dropped file:", file.name);
      // 여기에 파일 업로드 처리 로직 추가
    }
  };

  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: string | null;
  }>({
    row2: null,
    row4: null,
  });

  const toggleButton = (row: string, buttonName: string) => {
    setActiveButtons((prev) => ({
      ...prev,
      [row]: prev[row] === buttonName ? null : buttonName,
    }));
  };

  return (
    <>
      <NavigationBar />
      <div className={style.section}>
        <div
          className={style.image_container}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging ? "2px dashed #000" : "none",
          }}
        >
          <div className={style.text}>
            {uploadedFileName ? `Uploaded: ${uploadedFileName}` : "여따 드래그"}
          </div>
          <Image
            className={style.pagination}
            src="/pagination.svg"
            alt="scroll"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className={style.section2}>
        <div className={style.left}>
          <div className={style.title}>Upload Music File</div>
          <div className={style.description}>
            악기하고 난이도 선택하면 PDF로 변환해줌
          </div>
        </div>

        <div className={style.right}>
          <div className={style.row1}>instrument</div>
          <div className={style.row2}>
            <button
              className={
                activeButtons.row2 === "Piano"
                  ? style.button_Action
                  : style.button
              }
              onClick={() => toggleButton("row2", "Piano")}
            >
              Piano
            </button>
            <button
              className={
                activeButtons.row2 === "Guitar"
                  ? style.button_Action
                  : style.button
              }
              onClick={() => toggleButton("row2", "Guitar")}
            >
              Guitar
            </button>
            <button
              className={
                activeButtons.row2 === "Violin"
                  ? style.button_Action
                  : style.button
              }
              onClick={() => toggleButton("row2", "Violin")}
            >
              Violin
            </button>
            <button
              className={
                activeButtons.row2 === "Flute"
                  ? style.button_Action
                  : style.button
              }
              onClick={() => toggleButton("row2", "Flute")}
            >
              Flute
            </button>
          </div>

          <div className={style.row3}>Difficulty Level</div>
          <div className={style.row4}>
            <button
              className={
                activeButtons.row4 === "Beginner"
                  ? style.button_Action
                  : style.button
              }
              onClick={() => toggleButton("row4", "Beginner")}
            >
              Beginner
            </button>
            <button
              className={
                activeButtons.row4 === "Intermediate"
                  ? style.button_Action
                  : style.button
              }
              onClick={() => toggleButton("row4", "Intermediate")}
            >
              Intermediate
            </button>
            <button
              className={
                activeButtons.row4 === "Advanced"
                  ? style.button_Action
                  : style.button
              }
              onClick={() => toggleButton("row4", "Advanced")}
            >
              Advanced
            </button>
          </div>

          <div className={style.row5}>
            <button className={style.button1}>Reset</button>
            <button className={style.button2}>Upload</button>
          </div>
        </div>
      </div>
    </>
  );
}
