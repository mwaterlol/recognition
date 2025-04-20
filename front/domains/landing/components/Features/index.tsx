"use client";

import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
  Button,
  Anchor,
  Flex,
} from "@mantine/core";
import classes from "./index.module.css";
import {
  Cookie,
  Download,
  Gauge,
  IdCard,
  SlidersHorizontal,
  UserIcon,
} from "lucide-react";

const mockdata = [
  {
    title: "Зарегестрируйтесь",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: IdCard,
    step: "1 Шаг",
  },
  {
    title: "Выберите параметры генерации",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: SlidersHorizontal,
    step: "2 Шаг",
  },
  {
    title: "Экспортируйте результаты",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: Download,
    step: "3 Шаг",
  },
];

export function Features() {
  const theme = useMantineTheme();
  const features = mockdata.map(({ title, step, description, icon: Icon }) => (
    <Card
      key={title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="md"
    >
      <Text fz="lg" fw={500}>
        {step}
      </Text>
      <Flex align="center" gap={4}>
        <Icon
          size={20}
          className={classes.cardIcon}
          color={theme.colors.violet[5]}
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} c="violet.5">
          {title}
        </Text>
      </Flex>
      <Text fz="sm" c="dimmed" mt="sm">
        {description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge
          variant="filled"
          size="lg"
          component={Anchor}
          className={classes.badge}
        >
          Лучший ИИ для маркетплейсов
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Ускорьте выход на маркетплейсы за 3 шага
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
