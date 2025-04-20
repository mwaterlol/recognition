import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./index.module.css";
import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <Container className={classes.wrapper} size={1400} mt={80}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Генерация{" "}
          <Text component="span" variant="gradient" inherit>
            описаний и картинок
          </Text>
          <br /> для карточек на маркетплейсах
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Создавайте описания и картинки для карточек на маркетплейсах по
            названию товара, либо по названию и изображению товара. Мы сами
            подберем фон и стиль для изображения.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            leftSection={<Sparkles />}
          >
            Создать 5 карточек бесплатно
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Hero;
