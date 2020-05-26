import  React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CardCurso = () => (
  <Card>
    <Card.Title title="CLASE 1" subtitle="Acordes Basicos" left={LeftContent} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
    <Title>Lorem Insup</Title>
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper, enim eget malesuada auctor, orci diam pretium sapien, ac luctus felis odio vitae enim. Aenean vel nunc sed orci ultrices congue. Curabitur blandit ligula nisl. Sed ac sodales mauris. Vivamus vulputate lobortis lacus sed semper. Curabitur fringilla ut justo ut elementum. Pellentesque felis lacus, aliquet et turpis ut, rhoncus posuere libero. Sed ultricies nulla id eleifend accumsan. Nunc dictum, nibh quis laoreet tempus, enim enim gravida turpis, eget efficitur velit dui et turpis. Morbi ornare nec neque sed suscipit.</Paragraph>
    </Card.Content>
  </Card>
);

export default CardCurso;