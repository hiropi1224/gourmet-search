import { FC } from 'react';
import { Group, Text, useMantineTheme } from '@mantine/core';
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { UseMutationResult } from '@tanstack/react-query';

type Props = {
  useMutateUploadPostImg: UseMutationResult<void, any, FileWithPath[], unknown>;
  props?: Partial<DropzoneProps>;
  loading: boolean;
};

export const ImageDrop: FC<Props> = ({
  props,
  useMutateUploadPostImg,
  loading,
}) => {
  const theme = useMantineTheme();

  return (
    <Dropzone
      onDrop={(files) => useMutateUploadPostImg.mutate(files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
      loading={loading}
    >
      <Group
        position='center'
        spacing='xl'
        style={{ minHeight: 220, pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size='xl' inline>
            画像をここにドラッグするか、クリックでファイルを選択します。
          </Text>
          <Text size='sm' color='dimmed' inline mt={7}>
            1つのファイルが5MBを超えない範囲でファイルを添付してください。
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
