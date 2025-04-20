"use client";

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Portal,
  Flex,
  Title,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";

import classes from "./index.module.css";
import { ChevronDown, Sparkles, Store } from "lucide-react";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <Portal>
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "var(--mantine-spacing-xs)",
          height: rem(60),
          zIndex: 1000000,
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
          transition: "transform 400ms ease",
          backgroundColor: "var(--mantine-color-body)",
        }}
      >
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Group h="100%" gap={0} visibleFrom="sm">
              <Flex align="center" gap={6} ml="md">
                <Text component={Store} c="violet.8" w={24} h={24} />
                <Text size="xl" variant="gradient" component={Title} order={4}>
                  Маркетплейс GPT
                </Text>
              </Flex>
              <a href="#" className={classes.link}>
                О нас
              </a>
              <a href="#" className={classes.link}>
                Отзывы
              </a>
            </Group>

            <Group visibleFrom="sm">
              <Button variant="filled" leftSection={<Sparkles size={20} />}>
                5 Карточек бесплатно
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              О нас
            </a>
            <a href="#" className={classes.link}>
              Отзывы
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <ChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider my="sm" />

            <Button variant="filled" leftSection={<Sparkles size={20} />}>
              Создать карточку товара
            </Button>
          </ScrollArea>
        </Drawer>
      </Box>
    </Portal>
  );
}
