import { FC, useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BiCloudUpload as UploadIcon, BiTrash as DeleteIcon } from 'react-icons/bi';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';

import Image from '../elements/Image';

interface ImageUploadProps {
  defaultImageUrl?: string;
  onChange?: (imageUrl: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ defaultImageUrl = '', onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      if (!file) {
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setLoading(false);
      if (onChange) {
        onChange(imageUrl);
      }

      // Upload the image to the API using react-query
      const formData = new FormData();
      formData.append('image', file);

      console.log('🚀 aulianza ~ file: ImageUpload.tsx:53 ~ handleChange ~ formData:', formData);
      // uploadMutation.mutate(formData);
    }
  };

  const uploadButton = (
    <div className="flex flex-col items-center text-gray-500">
      {loading ? <LoadingOutlined /> : <UploadIcon size={24} />}
      <div className="mt-2 text-base leading-6 font-medium ">Upload</div>
    </div>
  );

  const handleDelete = () => {
    setImageUrl('');
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className="flex flex-col text-center w-full">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image className="rounded-full" src={imageUrl} alt="avatar" width={200} height={200} />
        ) : (
          uploadButton
        )}
      </Upload>
      {imageUrl && (
        <div
          className="flex w-full justify-center items-center gap-1 text-red-400 cursor-pointer"
          onClick={handleDelete}
        >
          <DeleteIcon size={16} />
          <div className="mt-1">Hapus</div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
