<template>
  <div class="urt__nav">
    <div class="urt__nav__sec">
      <img src="@/assets/img/logcomex-logo-full.png" alt="logcomex company logo" class="urt__nav__logo" />
      <div class="urt__nav__divider"/>
    </div>

    <div class="urt__nav__sec">
      <div class="urt__nav__divider" />

      <div id="navMenu" class="urt__nav__profile" @click="self.openMenu()">
        <img
					src="https://logcomex-majestic.s3.sa-east-1.amazonaws.com/avatar/avatar_default_2.png"
					alt="user profile image"
					class="urt__nav__profile__img"
				/>

        <div class="urt__nav__profile__desc">
          <span class="urt__nav__profile__desc__name">
            Helmuth Hofstatter
          </span>

          <span class="urt__nav__profile__desc__company">
            Logcomex Demo
          </span>
        </div>
      </div>

      <urt-menu target="navMenu" @component-key="(k: string) => self.setMenuComponentKey(k)">
				<div class="navMenu">
					<a href="https://plataforma.logcomex.io/preferences/account-preferences" class="navMenu__item">
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">language</i>
							<span>Alterar idioma</span>
						</div>
					</a>

					<a href="https://plataforma.logcomex.io/preferences/account-preferences" class="navMenu__item">
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">manage_accounts</i>
							<span>Central do cliente</span>
						</div>
					</a>

					<div class="navMenu__item">
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">apartment</i>
							<span>Alterar empresa</span>
						</div>
					</div>

					<a href="https://www.logcomex.com/termos" class="navMenu__item">
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">select_check_box</i>
							<span>Termos de uso</span>
						</div>
					</a>

					<a href="https://sistema.logcomex.io/#/relatorio-consumo" class="navMenu__item">
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">insert_chart</i>
							<span>Relatório de consumo</span>
						</div>
					</a>

					<a href="https://plataforma.logcomex.io/logout" class="navMenu__item">
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">exit_to_app</i>
							<span>Sair</span>
						</div>
					</a>
				</div>
			</urt-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UrtMenu from '@/components/pure/urt-menu/urt-menu.template.vue'
import { UrtProductNavigator } from './urt-product-navigator.ts'

const self = new UrtProductNavigator()
</script>

<style lang="sass">
@import "urt-product-navigator"
</style>
