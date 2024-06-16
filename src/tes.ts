import fileTypeChecker from "file-type-checker";
import fs from "fs";
import path from "path";

const main = async () => {
  const filePath = path.resolve(
    process.cwd(),
    "__test__",
    "assets",
    "test-image.jpg"
  );

  const file = fs.readFileSync(filePath);

  const validatedFileType = fileTypeChecker.validateFileType(file.buffer, [
    "png",
    "jpeg",
    "gif",
  ]);

  console.log(validatedFileType);
};

main();