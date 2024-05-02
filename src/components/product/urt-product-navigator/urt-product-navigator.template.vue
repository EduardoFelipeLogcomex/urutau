<template>
  <div class="urt__nav">
    <div class="urt__nav__sec">
      <img
				src="../../../assets/img/logcomex-logo-full.png"
				alt="logcomex company logo"
				class="urt__nav__logo"
				@click="self.redirectWithEnvironment('https://plataforma{ENV}.logcomex.io')"
			/>

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
            {{ self.userName.value }}
          </span>

          <span class="urt__nav__profile__desc__company">
            {{ self.userCompany.value }}
          </span>
        </div>
      </div>

      <urt-menu target="navMenu" @component-key="(k: string) => self.setMenuComponentKey(k)">
				<div class="navMenu">
					<div
						class="navMenu__item"
						@click="self.redirectWithEnvironment('https://plataforma{ENV}.logcomex.io/preferences/account-preferences')"
					>
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">language</i>
							<span>Alterar idioma</span>
						</div>
						
						<div class="navMenu__item__sec">
							<img v-if="self.currentLanguage.value === 'pt'" src="../../../assets/img/flag_brazil.svg" alt="idiom flag">
							<img v-else src="../../../assets/img/flag_united_states.svg" alt="idiom flag">
						</div>
					</div>

					<div
						class="navMenu__item"
						@click="self.redirectWithEnvironment('https://plataforma{ENV}.logcomex.io/preferences/account-preferences')"
					>
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">manage_accounts</i>
							<span>Central do cliente</span>
						</div>
					</div>

					<div class="navMenu__item" @click="self.openCompanyModal()">
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

					<div
						class="navMenu__item"
						@click="self.routeToV3()"
					>
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">insert_chart</i>
							<span>Relatório de consumo</span>
						</div>
					</div>

					<div
						class="navMenu__item"
						@click="self.redirectWithEnvironment('https://plataforma{ENV}.logcomex.io/logout')"
					>
						<div class="navMenu__item__sec">
							<i class="material-symbols-outlined">exit_to_app</i>
							<span>Sair</span>
						</div>
					</div>
				</div>
			</urt-menu>
    </div>
  </div>

	<urt-modal position="center" :is-open="self.company.value.isOpen" @close="self.closeCompanyModal()">
		<div class="changeCompany">
			<div class="changeCompany__header">
				<span>Alterar empresa</span>
				<div class="changeCompany__header__close">
					<i class="material-symbols-outlined" @click="self.closeCompanyModal()">close</i>
				</div>
			</div>

			<div class="changeCompany__body">
				<urt-autocomplete-select-outlined
					placeholder="Selecione uma empresa"
					:options="self.company.value.options"
					@change-value="(v) => self.setCompanyValue(v)"
				/>
			</div>

			<div class="changeCompany__footer">
				<urt-button type="secondary" size="sm" @click="self.clearPreferences()">
					Limpar preferencias
				</urt-button>

				<div class="changeCompany__footer__actions">
					<urt-button type="secondary" size="sm" @click="self.closeCompanyChangeMenu()">
						CANCELAR
					</urt-button>

					<urt-button type="primary" size="sm" @click="self.changeCompany()">
						CONFIRMAR
					</urt-button>
				</div>
			</div>
		</div>
	</urt-modal>
</template>

<script lang="ts" setup>
import UrtMenu from '../../pure/urt-menu/urt-menu.template.vue'
import UrtModal from '../../pure/urt-modal/urt-modal.template.vue'
import UrtButton from '../../pure/urt-button/urt-button.template.vue'
import { UrtProductNavigator } from './urt-product-navigator.ts'
import UrtAutocompleteSelectOutlined from '../../pure/forms/urt-autocomplete-select-outlined/urt-autocomplete-select-outlined.template.vue'
import { MakeXMLHttpRequestAdapter } from '../../../modules/Http/xml-http-request.adapter.ts'
import {onMounted} from "vue";

const self = new UrtProductNavigator(MakeXMLHttpRequestAdapter)

const props = defineProps<{
	ApiV3InfraKey: string
}>()

onMounted(() => {
	self.setV3ApiInfraKey(props.ApiV3InfraKey)
})
</script>

<style lang="sass">
@import "urt-product-navigator"
</style>
